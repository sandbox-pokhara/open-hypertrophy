export type ExerciseSchema = {
    id?: (number | null);
    /**
     * @type string
    */
    name: string;
    category?: (number | null);
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