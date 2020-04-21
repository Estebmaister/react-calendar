import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import CreateReminder from "./CreateReminder.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid transparent",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringPopper(props) {
  const classes = useStyles();
  const { anchorEl, onSave, onClose } = props;

  const handleClick = (event) => {
    console.log("click-in not assigned in div");
  };

  const open = Boolean(anchorEl);
  const id = open ? "spring-popper" : undefined;

  return (
    <div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="right"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div className={classes.paper} onClick={handleClick}>
              <CreateReminder
                placeholder={""}
                text={""}
                city={""}
                category={""}
                onSave={onSave}
                onClose={onClose}
                fullDate={props.fullDate}
              />
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
