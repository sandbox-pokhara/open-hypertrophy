export type CategorySchema = {
    id?: (number | null);
    /**
     * @type string
    */
    name: string;
    /**
     * @type integer
    */
    created_by: number;
    /**
     * @type string, date-time
    */
    date_created: string;
    /**
     * @type string, date-time
    */
    date_modified: string;
};