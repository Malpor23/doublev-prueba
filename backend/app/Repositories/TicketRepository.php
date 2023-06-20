<?php

namespace App\Repositories;

use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TicketRepository
{

    protected $ticket;

    public function __construct(Ticket $ticket)
    {
        $this->ticket = $ticket;
    }

    public function index(Request $request)
    {
        $data = $this->ticket::when($request->filled('user'), function ($query) use ($request) {
            $query->where('user', 'ILIKE', '%' . $request->user . '%');
        })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', 'ILIKE', '%' . $request->status . '%');
            })
            // Order by
            ->when($request->filled('order_by') && $request->filled('order'), function ($query) use ($request) {
                $request->order_by = match ($request->order_by) {
                    'id' => 'id',
                    'user' => 'user',
                    'status' => 'status',
                    default => $request->order_by,
                };

                $query->orderBy($request->order_by, $request->order);
            });

        $data = $request->filled('paginate') &&
                filter_var($request->paginate, FILTER_VALIDATE_BOOLEAN) === true &&
                $request->filled('by_paginate') ? $data->paginate($request->by_paginate) : $data->get();;

        return $data;
    }

    public function create()
    {
        try {
            DB::beginTransaction();
            $ticket = $this->ticket->forceCreate($this->requestParams());
            DB::commit();
        } catch (\Exception $error) {
            DB::rollback();
            Log::error($error->getMessage());
            return response()->json([
                'success' => false,
                'message' => $error->getMessage(),
            ], 400);
        }
        return response()->json([
            'success' => true,
            'data' => new TicketResource($ticket),
            'message' => 'Registro creado satisfactoriamente',
        ], 201);
    }

    public function update(Ticket $ticket)
    {
        try {
            DB::beginTransaction();
            $ticket->forceFill($this->requestParams($ticket->id))->save();
            DB::commit();
        } catch (\Exception $error) {
            DB::rollback();
            Log::error($error->getMessage());
            return response()->json([
                'success' => false,
                'message' => $error->getMessage(),
            ], 400);
        }
        return response()->json([
            'success' => true,
            'data' => new TicketResource($ticket),
            'message' => 'Registro editado satisfactoriamente',
        ], 200);
    }

    public function delete(Ticket $ticket)
    {
        try {
            DB::beginTransaction();
            $ticket->delete();
            DB::commit();
        } catch (\Exception $error) {
            DB::rollback();
            Log::error($error->getMessage());
            return response()->json([
                'success' => false,
                'message' => $error->getMessage(),
            ], 400);
        }
        return response()->json([
            'success' => true,
            'message' => 'Registro eliminado satisfactoriamente',
        ], 200);
    }

    private function requestParams($id = null) : array
    {
        $req = [
            'user'   => request('user'),
            'status' => request('status'),
        ];

        return $req;
    }
}
