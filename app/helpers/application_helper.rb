module ApplicationHelper
  def flash_class(level)
    case level
      when 'notice' then "alert alert-info"       # blue
      when 'success' then "alert alert-success"   # green
      when 'error' then "alert alert-error"       # red
      when 'alert' then "alert alert-error"       # gray
      when 'warning' then "alert alert-warning"   # yellow
    end
  end
end
