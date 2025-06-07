import { TransactionType } from "@/types/MasterData/TransactionType";

type FormValues={
    transactionName:string;
}

interface FormTransactionTypeProps{
    isModalOpen:boolean;
    setIsModalOpen:(open:boolean)=>void;
    isEditing: boolean;
    currentTransactionType: TransactionType | null;
    refreshTrigger: number;
    setRefreshTrigger: (value:number)=>void;
}

