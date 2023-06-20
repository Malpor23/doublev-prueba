import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPagination } from './pagination.interface';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule, AngularSvgIconModule],
    templateUrl: './pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnChanges {

    @Input() config: IPagination = {
        currentPage: 0,
        itemsPerPage: 0,
    };
    @Input() maxSize: number = 5;
    @Input() totalItems: number = 0;

    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    totalPages!: number;
    pages: number[] = [];
    values: number[] = [5, 10, 25, 50, 100];

    constructor() {}

    ngOnChanges(): void {
        if (this.config.itemsPerPage || this.totalItems) {
            this.createPaginator();
        }
    }

    createPaginator(): void {
        this.totalPages = Math.ceil(this.totalItems / this.config.itemsPerPage);
        this.pages = this.paginate(
            +this.totalPages,
            +this.config.currentPage,
            +this.maxSize
        );
    }

    paginate(totalPages: number, itemsPerPage: number = 1, maxPages: any): any {
        let startPage: number, endPage: number;

        if (totalPages <= maxPages) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxPagesBeforePage: number = Math.floor(maxPages / 2);
            const maxPagesAfterPage: number = Math.ceil(maxPages / 2) - 1;
            if (itemsPerPage <= maxPagesBeforePage) {
                startPage = 1;
                endPage = maxPages;
            } else if (itemsPerPage + maxPagesAfterPage >= totalPages) {
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                startPage = itemsPerPage - maxPagesBeforePage;
                endPage = itemsPerPage + maxPagesAfterPage;
            }
        }

        return Array.from(Array(endPage + 1 - startPage).keys()).map(
            (i: number) => startPage + i
        );
    }

    first(): void {
        if (this.config.currentPage > 1) {
            this.config.currentPage = 1;
            this.emit(this.config);
        }
    }

    last(): void {
        if (this.config.currentPage < this.totalPages) {
            this.config.currentPage = this.totalPages;
            this.emit(this.config);
        }
    }

    previous():void {
        if (this.config.currentPage > 1) {
            this.config.currentPage--;
            this.emit();
        }
    }

    next(): void {
        if (this.config.currentPage < this.totalPages) {
            this.config.currentPage++;
            this.emit();
        }
    }

    setCurrent(page: number): void {
        this.config.currentPage = page;
        this.emit(this.config);
    }

    emit(pagination?: IPagination): void {
        if (pagination) {
            this.config = pagination;
        }
        this.createPaginator();
        this.pageChange.emit(this.config.itemsPerPage)
    }

    changePage(pageSize: number): void {
        this.config.itemsPerPage = pageSize;
        this.emit(this.config)
    }

}
