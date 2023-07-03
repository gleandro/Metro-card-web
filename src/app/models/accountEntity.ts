import {UserEntity} from "./userEntity.model";

export class AccountEntity {
  id?: number;
  accountCode?: string;
  accountNumber?: string;
  accountDefault?: string;
  createdDate?: string;
  userCode?: string;
  balance?: string;
  userEntity?: UserEntity;
}
