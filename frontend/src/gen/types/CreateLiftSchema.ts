export type CreateLiftSchema = {
    /**
     * @type integer
    */
    exercise_id: number;
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
    date: string;
};