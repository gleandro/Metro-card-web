export interface RechargeAccountEntity {
    id: number;
    amount: number | null;
    createdDate: string;
    accountCode: string;
    userCode: string;
    accountEntity: AccountEntity | null;
    userEntity: UserEntity | null;
}