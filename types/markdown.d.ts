export declare function parseMD(file: string): {
    meta: {
        [key: string]: any;
    };
    content: string | Promise<string>;
};
export declare function parseMarkdown(obj: any): void;
