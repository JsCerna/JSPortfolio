import { Flex, Heading, Text } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { renderContent } from '@/app/resources';

export default function Blog(
	{ params: {locale}}: { params: { locale: string }}
) {
	const { newsletter } = renderContent();

	return (
		<Flex
			fillWidth maxWidth="s"
			direction="column"
			align="center"
			justifyContent="center"  // Cambiado de "justify" a "justifyContent"
			style={{ height: '100vh' }}
		>
			<Heading
				marginBottom="l"
				variant="display-strong-s"
			>
				Blog in construction
			</Heading>
			<Text variant="body-default-m" style={{ textAlign: 'center', marginBottom: '32px' }}>
				This blog is currently under construction. Stay tuned!
			</Text>

			{/* Newsletter form */}
			{newsletter.display && (
				<Mailchimp newsletter={newsletter} />
			)}
		</Flex>
	);
}
