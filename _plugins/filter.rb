module Jekyll
  module CustomSortFilter
    def custom_sort(input, *attributes)
      input.sort_by do |item|
        attributes.map { |attr| item[attr].to_s }
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomSortFilter)
