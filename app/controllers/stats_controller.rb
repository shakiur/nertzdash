class StatsController < ApplicationController
  def index
    @stats_modules = {}
    Dir['./lib/stats/**/*.rb'].each do |stat_lib|
      require stat_lib
      class_name = File.basename(stat_lib, '.rb').camelize
      stat_class = class_name.constantize

      next unless stat_class.team_type == params[:team_type]

      data = {}
      stat_perf = Benchmark.measure do
        data = stat_class.data
      end.real.round(3)

      @stats_modules[class_name] = {
        graph_type: stat_class.graph_type,
        graph_options: stat_class.graph_options,
        description: stat_class.description,
        data: data,
        performance: stat_perf
      }
    end
  end

  def view_stat
    # Break out page per stat TBD on performance observations
  end
end
