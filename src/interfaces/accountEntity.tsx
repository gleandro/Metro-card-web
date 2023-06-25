interface AccountEntity {
    id: number;
    accountCode: string;
    accountNumber: string;
    accountDefault: string;
    createdDate: string;
    userCode: string;
    balance: string;
    userEntity: UserEntity;
}