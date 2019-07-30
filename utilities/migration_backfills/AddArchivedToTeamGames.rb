Game.unscoped.where(archived: true).each do |game|
  game.team_games.each do |team_game|
    team_game.archived = true
    team_game.save!
  end
  game.rounds.each do |round|
    round.archived = true
  end
end
