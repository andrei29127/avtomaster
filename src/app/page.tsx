export default function Page() {
  return (
    <main className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-6">АвтоМастер</h1>
        <p className="text-lg text-white/80 mb-4">
          На сайте ведутся технические работы
        </p>
        <p className="text-white/60 mb-8">
          Мы скоро вернемся онлайн 🚗
        </p>
        <div className="border border-white/20 rounded-2xl p-6 bg-white/5">
          <p className="text-sm text-white/70 mb-2">
            Если вопрос срочный — свяжитесь с нами по телефону
          </p>
          <p className="text-xl font-semibold">
            +7(978)088-41-06
            +7(978)858-25-38
          </p>
        </div>
      </div>
    </main>
  )
}
