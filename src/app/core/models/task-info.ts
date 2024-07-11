export class TaskInfo {
    Id: number = 0;
    Title: string = '';
    Description: string = '';
    Status: string = '';
    CreatedDate: Date = new Date();

    constructor(args: any) {
        this.Id = args.id || args.Id || 0;
        this.Title = args.title || args.Title || '';
        this.Description = args.description || args.Description || '';
        this.CreatedDate = args.createdDate || args.CreatedDate || new Date();
        this.Status = args.Status || args.status || '';
    }
}