import React from "react";
import { Typography, DialogContent, Grid } from "@material-ui/core";
import YouTubePlayer from "components/YoutubePlayer";
import MovieLikeButton from "pages/Movies/MovieLikeButton";
import paths from "constants/paths";
import { BaseGridList } from "components/BaseComponents";
import DeleteMovieConfirmDialog from "pages/Movie/DeleteMovieConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import { BaseLink } from "components/BaseComponents";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";
import Details from "components/Details";
import { getNonDeletedItems } from "utils";

function MovieDetails({ movie, loading, onEditClick }) {
  const { redirectToBack } = useModalGallery();

  const director = movie ? movie.director : null;

  let otherMovies =
    loading || !director
      ? []
      : director.movies.filter(item => item.id !== movie.id);

  otherMovies = getNonDeletedItems(otherMovies);

  const directorLink =
    loading || !director ? null : (
      <BaseLink to={`${paths.DIRECTORS}/${director.id}`} toModal>
        {director.name}
      </BaseLink>
    );

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : movie ? (
    <>
      <Details
        title={movie.title}
        titleExtra={
          <MovieLikeButton
            movieId={movie.id}
            viewerHasLiked={movie.viewerHasLiked}
          />
        }
        imageUrl={movie.imageUrl}
        topSection={
          <>
            <Typography variant="h6">Directed by</Typography>
            <Typography>{directorLink}</Typography>
            <Typography variant="h6">Overview</Typography>
            <Typography>{movie.description}</Typography>
          </>
        }
        bottomSection={
          <Grid container spacing={2}>
            {movie.youtubeId && (
              <Grid item xs={12}>
                <YouTubePlayer youtubeId={movie.youtubeId} />
              </Grid>
            )}

            <Grid item xs={12}>
              {otherMovies.length ? (
                <>
                  <Typography variant="subtitle1">
                    {otherMovies.length
                      ? `Other movies by `
                      : `There is no other movie by `}
                    {directorLink}
                  </Typography>
                  <BaseGridList
                    items={otherMovies}
                    direction="horizontal"
                    renderItem={({ item }) => (
                      <MovieGridListTile key={item.id} movie={item} />
                    )}
                  />
                </>
              ) : (
                <Typography>
                  {`There is no other movie by `}
                  {directorLink}
                </Typography>
              )}
            </Grid>
          </Grid>
        }
        onEditClick={onEditClick}
        renderDeleteConfirmModal={({ open, hideDeleteConfirm }) => (
          <DeleteMovieConfirmDialog
            open={open}
            movie={movie}
            onClose={hideDeleteConfirm}
            onCompleted={redirectToBack}
          />
        )}
      />
    </>
  ) : (
    <DialogContent>
      <Typography variant="h5">Not Found</Typography>
    </DialogContent>
  );
}

export default MovieDetails;
