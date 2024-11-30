export type UserSchema = {
    id?: (number | null);
    last_login?: (string | null);
    /**
     * @description Designates that this user has all permissions without explicitly assigning them.
     * @default false
     * @type boolean | undefined
    */
    is_superuser?: boolean;
    /**
     * @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type string
    */
    username: string;
    first_name?: (string | null);
    last_name?: (string | null);
    email?: (string | null);
    /**
     * @description Designates whether the user can log into this admin site.
     * @default false
     * @type boolean | undefined
    */
    is_staff?: boolean;
    /**
     * @description Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
     * @default true
     * @type boolean | undefined
    */
    is_active?: boolean;
    /**
     * @type string | undefined, date-time
    */
    date_joined?: string;
    /**
     * @description The groups this user belongs to. A user will get all permissions granted to each of their groups.
     * @type array
    */
    groups: number[];
    /**
     * @description Specific permissions for this user.
     * @type array
    */
    user_permissions: number[];
};