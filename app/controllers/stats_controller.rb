class StatsController < ApplicationController
  def index
    @stats_modules = {}
    Dir['./lib/stats/**/*.rb'].each do |stat_lib|
      require stat_lib
      class_name = File.basename(stat_lib, '.rb').camelize
      stat_class = class_name.constantize
      @stats_modules[class_name] = stat_class
    end
  end

  def view_stat
    # Break out page per stat TBD
  end
end
