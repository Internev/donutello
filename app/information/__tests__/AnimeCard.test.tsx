
import { render, screen } from '../../lib/test-utils'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AnimeCard, { AnimeMedia } from '../AnimeCard'

// Mock data
const mockAnime = {
  id: 1,
  title: {
    userPreferred: 'Test Anime Title'
  },
  coverImage: {
    large: 'https://example.com/image.jpg'
  },
  startDate: {
    year: '2023'
  },
  endDate: {
    year: '2024'
  },
  type: 'Anime',
  averageScore: 85,
  favourites: 6000
} as unknown as AnimeMedia

const mockAnimeUnpopular = {
  ...mockAnime,
  favourites: 1000
} as unknown as AnimeMedia

describe('AnimeCard', () => {
  it('renders anime card with correct title', () => {
    render(<AnimeCard anime={mockAnime} />)
    expect(screen.getByText('Test Anime Title')).toBeInTheDocument()
  })

  it('renders popular anime with star icon', () => {
    render(<AnimeCard anime={mockAnime} />)
    expect(screen.getByText('⭐️')).toBeInTheDocument()
  })

  it('does not render star icon for unpopular anime', () => {
    render(<AnimeCard anime={mockAnimeUnpopular} />)
    expect(screen.queryByText('⭐️')).not.toBeInTheDocument()
  })

  it('shows additional information on hover', async () => {
    render(<AnimeCard anime={mockAnime} />)

    // Find the card body and hover over it
    const cardBody = screen.getByRole('group')
    await userEvent.hover(cardBody)

    // Check if hover content appears
    expect(screen.getByText('TV')).toBeInTheDocument()
    expect(screen.getByText('Rating: 85%')).toBeInTheDocument()
    expect(screen.getByText('♥ 6,000')).toBeInTheDocument()
    expect(screen.getByText('2023 - 2024')).toBeInTheDocument()
  })

  it('renders with correct date format for same year', () => {
    const sameYearAnime = {
      ...mockAnime,
      startDate: { year: '2023' },
      endDate: { year: '2023' }
    } as unknown as AnimeMedia
    render(<AnimeCard anime={sameYearAnime} />)
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  // Snapshot test
  it('matches snapshot', () => {
    const { container } = render(<AnimeCard anime={mockAnime} />)
    expect(container).toMatchSnapshot()
  })
})