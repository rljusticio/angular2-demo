import {Component, OnChanges, EventEmitter} from 'angular2/core';

@Component({
    selector: 'pagination',
    templateUrl: 'app/shared/pagination.template.html',
    inputs: ['items', 'pageSize:page-size'],
    outputs: ['pageChanged:page-changed'],
    styles: [`
        .pagination:hover {
            cursor: pointer;
        }
    `]
})

export class PaginationComponent implements OnChanges{
    items:any[] = [];
    pageSize:number = 10;
    pages:any[];
    currentPage;
    pageChanged = new EventEmitter();

    ngOnChanges():any {
        this.currentPage = 1;
        this.pages = [];
        var pagesCount = this.items.length/this.pageSize;
        for (var i = 1; i <= pagesCount; i++) {
            this.pages.push(i);
        }
    }

    changePage(page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }

    previous() {
        if (this.currentPage == 1) {
            return;
        }
        this.currentPage--;
        this.pageChanged.emit(this.currentPage);
    }

    next() {
        if (this.currentPage == this.pages.length) {
            return;
        }
        this.currentPage++;
        this.pageChanged.emit(this.currentPage);
    }
}

