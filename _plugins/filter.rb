module Jekyll
  module CustomSortFilter
    def custom_sort(input, *attributes)
      input.sort do |a, b|
        comparison = 0
        attributes.each do |attr|
          comparison = a[attr] <=> b[attr]
          break if comparison != 0
        end
        comparison
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomSortFilter)
