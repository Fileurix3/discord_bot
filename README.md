# Dotfiles

Hyprland and Neovim dotfiles

## Screenshots

![screenshot](./assets/screenshot_1.png)
![screenshot](./assets/screenshot_2.png)

## Themes:

#### ranger icons:

```
git clone https://github.com/alexanderjeurissen/ranger_devicons ~/dotfiles/.config/ranger/plugins/ranger_devicons
```

## Install:

**dependencies**: `stow hyprland nvim hypridle hyprlock hyprsunset swaybg ranger waybar wofi kitty hyprpolkitagent sxiv pavucontrol nwg-look grim slurp bash-completion wl-clipboard python-pillow`

### Copy the repository to your home directory

```bash
git clone https://github.com/soirrex/dotfiles.git
```

### Go to the directory and run the stow command

```
cd dotfiles
stow .
```

## Programs

| Component      | Program                                     |
| -------------- | ------------------------------------------- |
| Window manager | [Hyprland](https://hypr.land/)              |
| Shell          | [bash](https://www.gnu.org/software/bash/)  |
| Terminal       | [kitty](https://sw.kovidgoyal.net/kitty/)   |
| File manager   | [ranger](https://github.com/ranger/ranger)  |
| Editor         | [Neovim](https://neovim.io/)                |
| Launcher       | [wofi](https://hg.sr.ht/~scoopta/wofi)      |
| Status bar     | [waybar](https://github.com/Alexays/Waybar) |

## Wallpapers:

To change the wallpaper, select the image you want from the `.config/hypr/wallpapers/` folder and rename it to `wallpaper.jpg`

<table>
  <tr>
    <td><img src="./.config/hypr/wallpapers/wallpaper.jpg" width="200"></td>
    <td><img src="./.config/hypr/wallpapers/wallpaper-rei.jpg" width="200"></td>
  </tr>
</table>

## Hotkeys

### Hyprland:

- **SUPER + r**: open terminal
- **ALT + q**: close window
- **SUPER + SHIFT + p**: exit
- **SUPER + e**: open file manager
- **SUPER + w**: toggle floating mode
- **SUPER + v**: open menu
- **SUPER + u**: toggle split
- **SUPER + f**: full screen
- **SUPER + SHIFT + q**: exit hyprland
- **SUPER + (left,right,up,down)**: move focus (left,right,up,down)
- **SUPER + (h,j,k,l)**: move focus (left,right,up,down)
- **SUPER + (1..0)**: switch workspaces (1..10)
- **SUPER + SHIFT + (1..0)**: move active window to a workspace (1..10)
- **SUPER + mouse_down**: scroll through existing workspaces
- **SUPER + mouse_up**: scroll through existing workspaces
- **SUPER + s**: hyprlock
- **SUPER + SHIFT + s**: create screenshot
- **SUPER + SHIFT + j**: open btop
- **SUPER + mouse_left**: move window
- **SUPER + mouse_right**: resize window

### Ranger:

- **ctrl+h**: show hidden files
- **dd**: delete
- **r**: rename
- **a**: create file
- **A**: create folder
- **y**: copy
- **p**: paste
- **m**: move
- **cc**: copy
- **cf**: copy full path
- **cn**: copy name
