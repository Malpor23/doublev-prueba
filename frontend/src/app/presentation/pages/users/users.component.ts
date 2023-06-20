import { Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { IParams, SearchResponse } from '../../../domain/base';
import { SearchModel } from '../../../domain/model';
import { SearchUseCase } from '../../../domain/uses-cases';
import { IPagination, PaginationComponent } from '../../shared/components/pagination';
import { PermissionService} from '../../shared/service';
import { NotificationData, NotificationService } from '../../shared/components/notification';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, PaginationComponent],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

    query: IParams = {
        filter: 'manuel',
        page: 1,
        perPage: 10
    }
    search: string = '';

    searchUsers: Array<SearchModel> = [];
    pagination: IPagination = {
        currentPage: this.query.page,
        itemsPerPage: this.query.perPage,
    };
    total: number = 0;

    private searchUseCase: SearchUseCase = inject(SearchUseCase);
    private router: Router = inject(Router);
    private permission: PermissionService = inject(PermissionService);
    private readonly notification: NotificationService = inject(NotificationService);

    ngOnInit(): void {
        this.getSearch();
    }

    getSearch(): void {
        this.searchUseCase.search(this.query).subscribe({
            next: (resp: SearchResponse<SearchModel[]>) => {
                if (resp.items) {
                    this.searchUsers = resp.items;
                }
                this.total = resp.total_count;
            }
        });
    }

    onSearch(): void {
        this.query.filter = this.search;
        if(this.onCompare()) {
            this.getSearch();
        }
    }

    setPage(page: number): void {
        this.query.perPage = page;
        this.getSearch();
    }

    onProfile(user: SearchModel): void {
        if (this.permission.withPermission(user.score)) {
            this.router.navigate([`./perfil/${user.login}`]).then();
        } else {
            const notification: NotificationData = {
                type: 'warning',
                title: 'Advertencia',
                text: `El usuario ${user.login} tiene un scope menor a 30`,
            };
            this.notification.show(notification);
        }
    }

    onCompare(): boolean {
        return this.search !== 'doublevpartners';
    }
}
