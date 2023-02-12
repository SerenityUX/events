import { Card, Box, Text, Flex, Avatar, Heading } from 'theme-ui'
import tt from 'tinytime'
import Link from 'next/link'
import Sparkles from './sparkles'

const past = dt => new Date(dt) < new Date()
const now = (start, end) =>
  new Date() > new Date(start) && new Date() < new Date(end)

const Event = ({ id, slug, title, desc, leader, avatar, start, end, cal }) => (
  <Link href="/[slug]" as={`/${slug}`} passHref>
    <Box
      sx={{
        position: 'relative',
        textDecoration: 'none',
        bg: 'elevated',
        color: 'text',
        cursor: 'pointer',
        p: 0,
        borderRadius: 'extra',
        boxShadow: 'card',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          bg: past(end) ? 'sunken' : 'primary',
          color: past(end) ? 'text' : 'white',
          px: 3,
          py: 3,
          lineHeight: ['subheading', 'body'],
          strong: { display: ['block', 'inline'] }
        }}
      >
        <Text>
          <strong>{tt('{MM} {Do}').render(new Date(start))}</strong>{' '}
          {tt('{h}:{mm}').render(new Date(start))}–
          {tt('{h}:{mm} {a}').render(new Date(end))}
        </Text>
      </Box>
      <Box sx={{ p: 3 }}>
        <Heading variant="subheadline" sx={{ mt: 0, mb: 1 }}>
          {title}
        </Heading>
        <Flex
          sx={{
            alignItems: 'center',
            color: 'muted'
          }}
        >
          {now(start, end)}
          {!avatar.includes('emoji') && (
            <Avatar
              src={avatar}
              alt={`${leader} profile picture`}
              size={24}
              sx={{ height: 24, mr: 2 }}
            />
          )}
          <Text as="span">{leader}</Text>
        </Flex>
        {now(start, end) && (
          <Sparkles
            aria-hidden
            style={{
              pointerEvents: 'none',
              position: 'absolute !important',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        )}
      </Box>
    </Box>
  </Link>
)

export default Event
