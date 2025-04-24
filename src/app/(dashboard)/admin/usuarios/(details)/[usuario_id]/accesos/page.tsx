interface IProps {
  params: Promise<{ usuario_id: string }>
}

export default async function Page({ params }: IProps) {
  return <div>page</div>
}
