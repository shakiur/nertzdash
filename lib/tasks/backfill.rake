namespace :backfill do
  desc "Looks at all games and creates team_games and populates the team_game_id within each round"
  task backfill_team_games: :environment do
    TeamGame.delete_all

    Game.all.each do |game|
      unique_team_ids = game.rounds.map { |round| round.team_id }.uniq

      unique_team_ids.each do |team_id|
        # Create a TeamGame for the Team within a Game
        team_game = TeamGame.new
        team_game.game_id = game.id
        team_game.team_id = team_id
        team_game.total_score = Team.find(team_id).total_score_for_game(game)
        team_game.save

        # Update all Rounds to connect with its TeamGame
        rounds = Round.where(game_id: game.id, team_id: team_id)
        rounds.update_all(team_game_id: team_game.id)

        # Update TeamGame with the total score from all Rounds
        team_game.total_score = team_game.rounds.sum(:score)
        team_game.save!
      end
    end
  end

end
