export type LiftSchema = {
    exercise__category__name?: (string | null);
    /**
     * @type string
    */
    exercise__name: string;
    id?: (number | null);
    /**
     * @type integer
    */
    user: number;
    /**
     * @type string | undefined, date-time
    */
    date?: string;
    /**
     * @type integer
    */
    exercise: number;
    /**
     * @default 8
     * @type integer | undefined
    */
    repetitions?: number;
    /**
     * @default 50
     * @type integer | undefined
    */
    weight?: number;
    /**
     * @type string, date-time
    */
    date_created: string;
    /**
     * @type string, date-time
    */
    date_modified: string;
};