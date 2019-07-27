Game.all.each { |game| game.team_games.select { |tg| tg.rounds.any? && game.current_round_number == tg.rounds.last.round_number }.each { |tg| tg.update_attribute(:active, true) } }
