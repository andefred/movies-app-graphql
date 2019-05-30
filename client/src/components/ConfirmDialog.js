// OK!!
import React from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { BaseButton, BaseDialog, BaseDialogTitle } from "./BaseComponents";
import ButtonWithMutation from "./ButtonWithMutation";

function ConfirmDialog({
  open,
  onClose,
  title,
  content,
  mutationProps,
  okText = "OK",
  cancelText = "Cancel"
}) {
  return (
    <BaseDialog
      fullScreen={false}
      hideCloseButton={true}
      open={open}
      onClose={onClose}
    >
      <BaseDialogTitle fullScreen={false}>{title}</BaseDialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <BaseButton onClick={onClose} color="secondary">
          {cancelText}
        </BaseButton>
        <ButtonWithMutation {...mutationProps} color="primary">
          {okText}
        </ButtonWithMutation>
      </DialogActions>
    </BaseDialog>
  );
}

export default ConfirmDialog;
