import TransactionRecordsTable from "@/components/TransactionRecordsTable";
import { getTransactionRecord } from "@/service/TransactionService"
import { useQuery } from "@tanstack/react-query"

const Transaction = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['transaction-records-query-key'],
    queryFn: getTransactionRecord,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    
    <TransactionRecordsTable data={data?.data} />
    
  )
}

export default Transaction