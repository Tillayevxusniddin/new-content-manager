export default function page() {
	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-foreground text-2xl font-black'>設定</h1>
				<p className='text-muted-foreground text-sm'>モックの設定画面です。</p>
			</div>
			<div className='border-glass-border bg-card/70 rounded-[2rem] border p-6 backdrop-blur-xl'>
				<div className='text-muted-foreground text-sm'>
					ここに認証、通知、表示設定などを追加できます。
				</div>
			</div>
		</div>
	)
}
