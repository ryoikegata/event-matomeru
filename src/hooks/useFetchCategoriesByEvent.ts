import { useEffect, useState, useCallback } from "react";
import { CategoryType } from "@/services/schema/types";
import { supabase } from "@/utils/supabase/supabase";

export const useFetchCategoriesByEvent = (eventId: number) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: categoryIds } = await supabase
        .from("event_category")
        .select("category_id")
        .eq("event_id", eventId);

      const ids = categoryIds?.map(
        (category) => category.category_id
      ) as number[];

      const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .in("id", ids);

      setCategories(categories as CategoryType[]);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error };
};
