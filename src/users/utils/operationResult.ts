
export class OperationResult{
    response: boolean;
    message: string;
    result: any;

    constructor() {
        this.response = false;
        this.message = '';
        this.result = null;        
    }
}