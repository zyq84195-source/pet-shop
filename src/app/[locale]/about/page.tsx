import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', emoji: '👩‍💼' },
    { name: 'Mike Chen', role: 'Head Groomer', emoji: '💇' },
    { name: 'Emily Davis', role: 'Veterinarian', emoji: '👩‍⚕️' },
    { name: 'Tom Wilson', role: 'Pet Care Specialist', emoji: '👨‍🌾' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-white/90 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('story.title')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('story.content')}</p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🏪</div>
                <p className="text-orange-600 font-medium">Est. 2010</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('mission.title')}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              {t('mission.content')}
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('values.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'compassion', emoji: '❤️' },
              { key: 'quality', emoji: '⭐' },
              { key: 'trust', emoji: '🤝' },
              { key: 'community', emoji: '🏘️' },
            ].map((value) => (
              <div key={value.key} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="text-4xl mb-4">{value.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t(`values.${value.key}`)}
                </h3>
                <p className="text-sm text-gray-600">
                  {t(`values.${value.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{t('team.title')}</h2>
          <p className="text-gray-600 text-center mb-8">{t('team.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
