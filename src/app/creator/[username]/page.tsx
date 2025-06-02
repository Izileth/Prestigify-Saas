import Image from "next/image"
import { getInfoUser } from "./_data_acess/get-info-user"
import { notFound } from "next/navigation"
import { FormData } from "./_components/form"
import { Header } from "@/app/dashboard/_components/header"
export default async function Apoia({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getInfoUser({ username })

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div>
        <Header />
      </div>
      <section className="relative">
        <div className="w-full h-48 md:h-64 lg:h-80 relative bg-gradient-to-b from-gray-900 to-gray-800">
          <Image
            src={user.image ?? "https://github.com/devfraga.png"}
            alt="Profile banner"
            fill
            className="object-cover opacity-20"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 md:-bottom-16">
          <div className="relative">
            <Image
              src={user.image ?? "https://github.com/devfraga.png"}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white object-cover border-4 border-white shadow-lg"
              alt={user.name ?? "User profile"}
              width={128}
              height={128}
              quality={100}
            />
            <div className="absolute inset-0 rounded-full border border-gray-200" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pt-16 md:pt-20 pb-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Info Header */}
          <header className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 tracking-tight">
              {user.name ?? "User"}
            </h1>
            <div className="w-12 h-px bg-gray-300 mx-auto" />
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* About Section */}
            <section className="space-y-6">
              <div className="border border-gray-200 rounded-none bg-white">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 tracking-wide">SOBRE</h2>
                    <div className="flex-1 h-px bg-gray-200 ml-4" />
                  </div>

                  <div className="space-y-4">
                    <div className="border-l-2 border-gray-900 pl-4">
                      <p className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-1">
                        {user.name ?? "User"}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {user.bio ?? "No biography available."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats or Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Perfil</div>
                  <div className="text-sm font-medium text-gray-900">Ativo</div>
                </div>
                <div className="border border-gray-200 p-4 text-center">
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Estatus</div>
                  <div className="text-sm font-medium text-gray-900">Disponível</div>
                </div>
              </div>
            </section>

            {/* Support Section */}
            <section className="space-y-6">
              <div className="border border-gray-200 rounded-none bg-white">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900 tracking-wide">SUPORTE</h2>
                    <div className="flex-1 h-px bg-gray-200 ml-4" />
                  </div>

                  <div className="border-l-2 border-gray-900 pl-4 mb-6">
                    <p className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                      {user.name ? `Apoie ${user.name}` : "Apoie o Criador"}
                    </p>
                  </div>

                  <FormData slug={user.username!} creatorId={user.conectStipeAccountId ?? ""} />
                </div>
              </div>

              {/* Additional Support Info */}
              <div className="border border-gray-200 p-6">
                <div className="text-center space-y-3">
                  <div className="w-8 h-px bg-gray-300 mx-auto" />
                  <p className="text-xs uppercase tracking-wider text-gray-500">Secure Payment</p>
                  <p className="text-xs text-gray-400">All transactions are encrypted and secure</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-px bg-gray-300" />
              <p className="text-xs uppercase tracking-wider text-gray-500">Prestigify Creators</p>
              <div className="w-6 h-px bg-gray-300" />
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Designed with precision and care.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
