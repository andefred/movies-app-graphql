// OK!!
import React from "react";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import MovieLikeButton from "./MovieLikeButton";
import { ModalLink } from "react-router-modal-gallery";
import Image from "components/Image";

function MovieGridListTile({
  movie,
  // GridList component adds "style" prop to its children to create the cols etc.
  // So, we need to forward this prop like this.
  style
}) {
  return (
    <GridListTile style={style}>
      <ModalLink to={`${paths.MOVIES}/${movie.id}`}>
        <Image src={movie.imageUrl} />
      </ModalLink>
      <GridListTileBar
        title={movie.title}
        subtitle={movie.director ? movie.director.name : ""}
        actionIcon={
          <MovieLikeButton
            movieId={movie.id}
            viewerHasLiked={movie.viewerHasLiked}
          />
        }
      />
    </GridListTile>
  );
}

export default MovieGridListTile;
