import { Flex } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
    { params: { locale } }: { params: { locale: string } }
) {
    const t = await getTranslations();
    const { work } = renderContent(t);

    const title = work.title || "Work Experience";
    const description = work.description || "Highlights of my professional journey.";
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://${baseURL}/${locale}/work/`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function WorkPage(
    { params: { locale } }: { params: { locale: string } }
) {
    unstable_setRequestLocale(locale);

    const t = useTranslations();
    const { person, about } = renderContent(t);
    const experiences = about.work.experiences || [];

    return (
        <Flex fillWidth maxWidth="m" direction="column" gap="32">
            {/* Header */}
            <Flex direction="column" align="center" style={{ paddingBottom: '32px' }}>
                <h1 style={{ fontSize: '38px', fontWeight: 'bold' }}>Jose's Work Experience</h1>
                <p style={{ fontSize: '20px', marginTop: '16px', color: '#666' }}>
                    University project's
                </p>
            </Flex>

            {/* Experiences */}
            {experiences.map((experience, index) => (
                <Flex
                    key={index}
                    fillWidth
                    direction="column"
                    gap="24"
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {experience.company}
                    </h2>
                    <p style={{ fontSize: '18px', color: '#007BFF' }}>
                        {experience.role} {experience.timeframe && `(${experience.timeframe})`}
                    </p>
                    <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                        {experience.achievements.map((achievement, index) => (
                            <li key={index} style={{ fontSize: '16px', marginBottom: '8px' }}>
                                {achievement}
                            </li>
                        ))}
                    </ul>
                    {experience.images.length > 0 && (
                        <Flex fillWidth wrap gap="16" style={{ marginTop: '16px' }}>
                            {experience.images.map((image, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        width: `${image.width * 10}px`, // Escala el ancho
                                        height: `${image.height * 10}px`, // Escala el alto
                                    }}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </Flex>
                    )}
                    {/* Learn More Button */}
                    <Flex style={{ justifyContent: 'center', marginTop: '16px' }}>
                        <a
                            href={experience.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                textDecoration: 'none',
                            }}
                        >
                            Learn More
                        </a>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
}
