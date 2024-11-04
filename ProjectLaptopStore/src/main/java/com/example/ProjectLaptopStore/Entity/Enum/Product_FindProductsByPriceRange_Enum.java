package com.example.ProjectLaptopStore.Entity.Enum;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
public enum Product_FindProductsByPriceRange_Enum {
    BELOW_10(Arrays.asList(0, 10), "Dưới 10 triệu"),
    BETWEEN_10_AND_15(Arrays.asList(10, 15), "Từ 10 - 15 triệu"),
    BETWEEN_15_AND_20(Arrays.asList(15, 20), "Từ 15 - 20 triệu"),
    BETWEEN_20_AND_25(Arrays.asList(20, 25), "Từ 20 - 25 triệu"),
    BETWEEN_25_AND_30(Arrays.asList(25, 30), "Từ 25 - 30 triệu"),
    ABOVE_30(Arrays.asList(30, null), "Trên 30 triệu");// null có nghĩa là ko còn giới hạn ở trên

    private final List<Integer> priceRange; // sử dụng list bởi vì mảng thì bị lỗi khi chuyển đổi qua json
    private final String description;

    Product_FindProductsByPriceRange_Enum(List<Integer> priceRange, String description) {
        this.priceRange = priceRange;
        this.description = description;
    }

    public List<Integer> getPriceRange() {
        return priceRange;
    }

    public String getDescription() {
        return description;
    }

    public static Map<List<Integer>, String> getPriceRanges() {
        Map<List<Integer>, String> priceRanges = new TreeMap<>((a, b) -> a.get(0).compareTo(b.get(0))); //phải tự sắp xếp vì key là list
        for (Product_FindProductsByPriceRange_Enum range : Product_FindProductsByPriceRange_Enum.values()) {
            priceRanges.put(range.getPriceRange(), range.getDescription());
        }
        return priceRanges;
    }
}
