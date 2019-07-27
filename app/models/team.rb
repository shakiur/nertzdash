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
  has_many :games, -> { distinct }, :through => :rounds
  has_many :players, :through => :team_players

  SINGLES = 'singles'
  DOUBLES = 'doubles'

  VALID_TEAM_TYPES = [
    SINGLES,
    DOUBLES
  ]

  validates :team_type, inclusion: { in: VALID_TEAM_TYPES }

  scope :singles, -> { where(team_type: SINGLES) }
  scope :doubles, -> { where(team_type: DOUBLES) }

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
    "#{self.name} (#{self.team_members_label})"
  end

  # Builds a hash of all teams info that's sorted by players name so it's easy to navigate
  # @return [Hash]
  def self.build_alphabetical_hash_of_teams
    teams = Team.includes(team_players: :player).map { |team|
      team_players = team.team_players.map(&:player)
      team_players_sorted = team_players.sort_by(&:name)
      team_players_names = team_players_sorted.map(&:name)

      { :id => team.id,
        :team_name => team.name,
        :team_type => team.team_type.capitalize,
        :team_players_names => team_players_names.join(', ') }
    }

    return teams.sort_by { |team| team[:team_players_names] }
  end
end
