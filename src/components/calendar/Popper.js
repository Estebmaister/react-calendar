import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

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

let input = "Reminder";
const handleChange = (event) => {
  input = event.target.value;
};
const onClickSave = (e, props) => {
  props.onSave(input, e);
};

export default function SpringPopper(props) {
  const classes = useStyles();
  const { anchorEl } = props;

  const handleClick = (event) => {
    console.log("click-in");
    console.log(event);
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
              Add reminder
              <button onClick={(e) => onClickSave(e, props)}>Save</button>
              <br />
              <input placeholder="Reminder" onChange={handleChange}></input>
              <popReminder />
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
