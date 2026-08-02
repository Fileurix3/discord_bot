---@module 'hl'

hl.monitor({
  output   = "HDMI-A-1",
  mode     = "1920x1080@100",
  position = "0x0",
  scale    = 1,
})

hl.monitor({
  output    = "HDMI-A-2",
  mode      = "1920x1080@100",
  position  = "1920x0",
  scale     = 1,
  transform = 3,
})

--##################

--## MY PROGRAMS ###

--##################

-- See https://wiki.hyprland.org/Configuring/Keywords/

-- Set programs that you use

local terminal = "kitty"
local fileManager = "env EDITOR=nvim VISUAL=nvim kitty -e ranger"
local menu = "wofi --show drun"

hl.env("XCURSOR_SIZE", 24)

hl.env("HYPRCURSOR_SIZE", 24)

-- Autostart
hl.on("hyprland.start", function()
  hl.exec_cmd("waybar")
  hl.exec_cmd("hyprsunset --temperature 6000")
  hl.exec_cmd("swaybg -i ~/.config/hypr/wallpapers/wallpaper.jpg -m fill")
  hl.exec_cmd("systemctl --user start hyprpolkitagent")
  hl.exec_cmd("hypridle")
end)

-- Config

hl.config({
  general = {
    gaps_in = 4,
    gaps_out = 6,
    border_size = 1,
    resize_on_border = true,
    allow_tearing = false,
    layout = "dwindle",
    col = {
      active_border = "rgb(888888)",
      inactive_border = "rgb(333333)",
    },
  },
})

hl.config({
  cursor = {
    no_hardware_cursors = true,
  },
})

hl.config({
  decoration = {
    rounding = 8,
    active_opacity = 1,
    inactive_opacity = 1,
    shadow = {
      enabled = false,
      range = 10,
      render_power = 3,
    },
    blur = {
      enabled = true,
      size = 6,
      passes = 2,
    },
  },
})

hl.config({
  animations = {
    enabled = true,
  },
})

hl.config({
  master = {
    new_status = "master",
  },
})

hl.config({
  misc = {
    force_default_wallpaper = 0,
    disable_hyprland_logo = true,
  },
})

hl.config({
  input = {
    kb_layout = "us,ru",
    kb_options = "grp:win_space_toggle",
    follow_mouse = 1,
    sensitivity = -0.7,
    touchpad = {
      natural_scroll = false,
    },
  },
})

-- Device

hl.device({
  name = "epic-mouse-v1",
  sensitivity = -0.5,
})

-- Animations
hl.curve("myBezier", {
  type = "bezier",
  points = {
    { 0.05, 0.9 },
    { 0.1,  1.05 }
  }
})

hl.animation({
  leaf = "windows",
  enabled = true,
  speed = 7,
  bezier = "myBezier"
})

hl.animation({
  leaf = "windowsOut",
  enabled = true,
  speed = 7,
  bezier = "default",
  style = "popin 80%"
})

hl.animation({
  leaf = "border",
  enabled = true,
  speed = 10,
  bezier = "default"
})

hl.animation({
  leaf = "borderangle",
  enabled = true,
  speed = 8,
  bezier = "default"
})

hl.animation({
  leaf = "fade",
  enabled = true,
  speed = 7,
  bezier = "default"
})

hl.animation({
  leaf = "workspaces",
  enabled = true,
  speed = 6,
  bezier = "default"
})

--##################

--## KEYBINDINGS ###

--##################

-- See https://wiki.hyprland.org/Configuring/Keywords/

local mainMod = "SUPER"

-- Sets "Windows" key as main modifier

-- Example binds, see https://wiki.hyprland.org/Configuring/Binds/ for more

hl.bind(mainMod .. " + " .. "R", hl.dsp.exec_cmd(terminal))

hl.bind("ALT" .. " + " .. "Q", hl.dsp.window.close())

hl.bind(mainMod .. " + SHIFT + P", hl.dsp.exit())

hl.bind(mainMod .. " + " .. "E", hl.dsp.exec_cmd(fileManager))

hl.bind(mainMod .. " + " .. "W", hl.dsp.window.float())

hl.bind(mainMod .. " + " .. "V", hl.dsp.exec_cmd(menu))

hl.bind(mainMod .. " + " .. "P", hl.dsp.window.pseudo())

-- dwindle

-- bind = $mainMod, U, togglesplit, # dwindle

hl.bind(mainMod .. " + " .. "F", hl.dsp.window.fullscreen())

hl.bind(mainMod .. "+ SHIFT + Q", hl.dsp.exec_cmd("hyprctl dispatch exit"))

-- Move focus with mainMod + arrow keys

hl.bind(mainMod .. " + " .. "left", hl.dsp.focus({ direction = "left" }))

hl.bind(mainMod .. " + " .. "right", hl.dsp.focus({ direction = "right" }))

hl.bind(mainMod .. " + " .. "up", hl.dsp.focus({ direction = "up" }))

hl.bind(mainMod .. " + " .. "down", hl.dsp.focus({ direction = "down" }))

hl.bind(mainMod .. " + " .. "H", hl.dsp.focus({ direction = "left" }))

hl.bind(mainMod .. " + " .. "L", hl.dsp.focus({ direction = "right" }))

hl.bind(mainMod .. " + " .. "K", hl.dsp.focus({ direction = "up" }))

hl.bind(mainMod .. " + " .. "J", hl.dsp.focus({ direction = "down" }))

-- Move windows with mainMod + arrow keys

hl.bind(mainMod .. "+ SHIFT + H", hl.dsp.window.move { direction = "l" })

hl.bind(mainMod .. "+ SHIFT + L", hl.dsp.window.move { direction = "r" })

hl.bind(mainMod .. "+ SHIFT + K", hl.dsp.window.move { direction = "u" })

hl.bind(mainMod .. "+ SHIFT + J", hl.dsp.window.move { direction = "d" })

hl.bind(mainMod .. "+ SHIFT + left", hl.dsp.window.move { direction = "l" })

hl.bind(mainMod .. "+ SHIFT + right", hl.dsp.window.move { direction = "r" })

hl.bind(mainMod .. "+ SHIFT + up", hl.dsp.window.move { direction = "u" })

hl.bind(mainMod .. "+ SHIFT + down", hl.dsp.window.move { direction = "d" })

-- Switch workspaces with mainMod + [0-9]

hl.bind(mainMod .. " + " .. 1, hl.dsp.focus({ workspace = 1 }))

hl.bind(mainMod .. " + " .. 2, hl.dsp.focus({ workspace = 2 }))

hl.bind(mainMod .. " + " .. 3, hl.dsp.focus({ workspace = 3 }))

hl.bind(mainMod .. " + " .. 4, hl.dsp.focus({ workspace = 4 }))

hl.bind(mainMod .. " + " .. 5, hl.dsp.focus({ workspace = 5 }))

hl.bind(mainMod .. " + " .. 6, hl.dsp.focus({ workspace = 6 }))

hl.bind(mainMod .. " + " .. 7, hl.dsp.focus({ workspace = 7 }))

hl.bind(mainMod .. " + " .. 8, hl.dsp.focus({ workspace = 8 }))

hl.bind(mainMod .. " + " .. 9, hl.dsp.focus({ workspace = 9 }))

hl.bind(mainMod .. " + " .. 0, hl.dsp.focus({ workspace = 10 }))

-- Move active window to a workspace with mainMod + SHIFT + [0-9]

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 1, hl.dsp.window.move({ workspace = 1 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 2, hl.dsp.window.move({ workspace = 2 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 3, hl.dsp.window.move({ workspace = 3 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 4, hl.dsp.window.move({ workspace = 4 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 5, hl.dsp.window.move({ workspace = 5 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 6, hl.dsp.window.move({ workspace = 6 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 7, hl.dsp.window.move({ workspace = 7 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 8, hl.dsp.window.move({ workspace = 8 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 9, hl.dsp.window.move({ workspace = 9 }))

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. 0, hl.dsp.window.move({ workspace = 10 }))

-- Scroll through existing workspaces with mainMod + scroll

hl.bind(mainMod .. " + " .. "mouse_down", hl.dsp.focus({ workspace = "e+1" }))

hl.bind(mainMod .. " + " .. "mouse_up", hl.dsp.focus({ workspace = "e-1" }))

-- Hyprlock

hl.bind(mainMod .. " + " .. "S", hl.dsp.exec_cmd("hyprlock"))

-- Screen shot

hl.bind(mainMod .. " + " .. "SHIFT" .. " + " .. "S",
  hl.dsp.exec_cmd("grim -g \"$(slurp)\" ~/Pictures/screenshot_$(date +%Y-%m-%d_%H-%M-%S).png"))

-- Move/resize windows with mainMod + LMB/RMB and dragging

hl.bind(mainMod .. " + " .. "mouse:272", hl.dsp.window.drag(), { mouse = true })

hl.bind(mainMod .. " + " .. "mouse:273", hl.dsp.window.resize(), { mouse = true })

-- Laptop multimedia keys for volume and LCD brightness

hl.bind("XF86AudioRaiseVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+"), { locked = true })

hl.bind("XF86AudioLowerVolume", hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"), { locked = true })

hl.bind("XF86AudioMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"), { locked = true })

hl.bind("XF86AudioMicMute", hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"), { locked = true })

hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl s 10%+"), { locked = true })

hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl s 10%-"), { locked = true })

-- Requires playerctl

hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { locked = true })

hl.bind("XF86AudioPause", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })

hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })

hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), { locked = true })
