# Popeye
A native react popup component that can be anchored to any element.

# Disclaimer
Can only be used on cases wherein you're sure that the popover won't move.
i.e. Don't use it on a page that scrolls. Ironically demonstrated by the guide.
Still working on an (elegant) fix.

# Installation
```
npm install --save popeye
```

# Basic Usage
```
<button className="button" onClick={ Popeye.toggleHandler(this, "popover1") }>
  click me
  <Popeye
    opened={ this.state.popover1 } 
    onToggle={ Popeye.toggleHandler(this, "popover1") }>
    <div className="dropdown">
      Aye aye, Captain!
    </div>
  </Popeye>
</button>
```