# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  team_type  :string(255)
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ApplicationRecord
  has_many :team_players
  has_many :team_games
  has_many :rounds
  has_many :games, -> { distinct }, :through => :team_games
  has_many :players, :through => :team_players

  SINGLES = 'singles'
  DOUBLES = 'doubles'

  VALID_TEAM_TYPES = [
    SINGLES,
    DOUBLES
  ]

  validates :team_type, inclusion: { in: VALID_TEAM_TYPES }
  validates_uniqueness_of :name, scope: :team_type

  scope :singles, -> { where(team_type: SINGLES) }
  scope :doubles, -> { where(team_type: DOUBLES) }

  # Is team type for singles
  # @return [Boolean]
  def singles?
    self.team_type == SINGLES
  end

  # Is team type for doubles
  # @return [Boolean]
  def doubles?
    self.team_type == DOUBLES
  end

  # Get the total score this team has scored so far in given game
  # @return [Integer]
  def total_score_for_game(game)
    Round.where(team: self, game: game).map(&:score).sum
  end

  # Returns pretty string representation of its players
  # @return [String]
  def team_members_label
    self.players.map(&:name).join(' + ')
  end

  # Returns pretty string representation of team name with its players
  # @return [String]
  def label_with_players
    if self.singles?
      return self.name
    else
      "#{self.name} (#{self.team_members_label})"
    end
  end

  # Builds a Composite Round Rating history by month
  # @return [Hash] - Example: { '1/1/2019' => 0.42, '2/1/2019' => 0.55 }
  def calculate_composite_round_rating_by_month
    games_played = self.games
    return nil if games_played.empty?

    crr_history = Hash.new
    first_game_date = games_played.order(:date).first.date
    history_date = first_game_date.beginning_of_month

    while (history_date < Time.zone.today)
      average_crr = calculate_average_composite_round_rating_for_month(history_date)
      crr_history[history_date] = average_crr if average_crr.present?

      history_date += 1.month
    end

    return crr_history
  end

  # Calculates the average Composite Round Ratings for a month by looking for all games
  # played within a month, and then calculating the average of all rounds
  # @param [Date]
  # @return [Integer]
  def calculate_average_composite_round_rating_for_month(date)
    beginning_of_month = date
    end_of_month = date.end_of_month

    games_played = self.games.where(date: beginning_of_month..end_of_month)
    return nil if games_played.empty?

    all_composite_round_ratings = []

    games_played.each do |game|
      all_composite_round_ratings << game.all_composite_round_ratings_by_team(self)
    end

    all_composite_round_ratings = all_composite_round_ratings.flatten
    return nil if all_composite_round_ratings.empty?

    composite_round_ratings_average = all_composite_round_ratings.sum.to_f / all_composite_round_ratings.size.to_f

    return composite_round_ratings_average.round
  end
end
