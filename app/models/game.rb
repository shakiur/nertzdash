# == Schema Information
#
# Table name: games
#
#  id            :integer          not null, primary key
#  date          :date
#  winning_score :integer
#  archived      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Game < ApplicationRecord
  has_many :rounds
  has_many :team_games
  has_many :teams, -> { distinct }, :through => :team_games

  scope :archived, -> { unscoped.where(archived: true) }

  default_scope { where(archived: false) }

  # The most recently logged round number for this game
  # @return [Integer]
  def current_round_number
    return 0 unless self.rounds.any?
    return self.rounds.pluck(:round_number).max
  end

  # The next round number for this game
  # @return [Integer]
  def next_round_number
    self.current_round_number + 1
  end

  # The TeamGame that is winning this game instance
  # @return [TeamGame]
  def winning_team_game
    self.team_games.sort_by { |team_game| team_game.total_score }.last
  end

  # The winning score of this game instance
  # @return [Integer]
  def winning_score
    return 0 unless winning_team_game
    winning_team_game.total_score
  end

  # Comma separated string of team names participating in this game
  # @return [String]
  def team_names
    self.teams.map(&:name).join(', ')
  end

  # Archives this record (self)
  def archive!
    self.update_attribute(:archived, true)
  end

  # Used within the previous games table, calculates the place / score of team within a game
  # @param [Team]
  # @return [Hash]
  def team_results(team)
    sorted_team_games = Hash.new
    place = 1

    self.team_games.order(total_score: :desc).each do |team_game|
      sorted_team_games[team_game.team_id] = {
        :place => place,
        :total_score => team_game.total_score }

      place += 1
    end

    return sorted_team_games[team.id]
  end

  # Calculates all Composite Round Ratings for a team within a game
  # @param [Team]
  # @return [Integer]
  def all_composite_round_ratings_by_team(team)
    all_crrs = []

    all_rounds = self.rounds
    round_numbers = all_rounds.pluck(:round_number).uniq

    round_numbers.each do |round_number|
      single_row_of_rounds = all_rounds.select { |round| round.round_number == round_number }
      sorted_rounds = single_row_of_rounds.sort_by(&:score)

      min_score = sorted_rounds.first.score
      max_score = sorted_rounds.last.score
      next if min_score == max_score

      team_round = sorted_rounds.select { |round| round.team_id == team.id }.last
      next if team_round.nil?

      team_score = team_round.score

      total_round_differential = max_score - min_score
      total_team_differential = team_score - min_score

      round_rating = total_team_differential.to_f / total_round_differential.to_f

      all_crrs << round_rating
    end

    return all_crrs
  end
end
