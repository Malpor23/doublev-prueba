<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    public function __construct(TicketRepository $repo) {
        $this->repo = $repo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->repo->index($request)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TicketRequest $request): JsonResponse
    {
        return $this->repo->create();
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket): JsonResponse
    {
        $unit = new TicketResource($ticket);

        return response()->json([
            'success' => true,
            'data' => $unit,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TicketRequest $request, Ticket $ticket): JsonResponse
    {
        return $this->repo->update($ticket);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket): JsonResponse
    {
        return $this->repo->delete($ticket);
    }
}
