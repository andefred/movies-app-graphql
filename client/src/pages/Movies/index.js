// OK!!
import React, { useMemo } from "react";
import MoviesFeed from "./MoviesFeed";
import GridListContainer from "components/GridListContainer";
import MovieGridListTile from "./MovieGridListTile";
import queryString from "query-string";

function Movies({ location: { search } }) {
  const searcyQuery = useMemo(() => queryString.parse(search), [search]);
  const filter = {
    title: searcyQuery.title
  };

  return (
    <MoviesFeed filter={filter}>
      {({ movies, loading }) => (
        <GridListContainer
          items={movies}
          loading={loading}
          renderItem={({ item }) => (
            <MovieGridListTile key={item.id} movie={item} />
          )}
        />
      )}
    </MoviesFeed>
  );
}

export default Movies;
