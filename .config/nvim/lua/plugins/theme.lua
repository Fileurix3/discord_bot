return {
  "catppuccin/nvim",
  name = "catppuccin",
  priority = 1000,
  opts = {
    flavour = "mocha", -- или latte, frappe, macchiato
    transparent_background = false,

    color_overrides = {
      mocha = {
        text     = "#ffffff",

        -- Секция "ниже text" — делаем их заметно темнее
        subtext1 = "#9a9a9a",
        subtext0 = "#808080",
        overlay2 = "#606060",
        overlay1 = "#4a4a4a",
        overlay0 = "#3a3a3a",

        -- Секция фонов — максимально темные, но с различимыми оттенками
        surface2 = "#2a2a2a",
        surface1 = "#202020",
        surface0 = "#1a1a1a",

        -- Глубокий черный фон
        base     = "#0d0d0d",
        mantle   = "#080808",
        crust    = "#030303",
      },
    },

    custom_highlights = function(colors)
      return {
        LineNr = { fg = "#606060" },
      }
    end,

    integrations = {
      cmp = true,
      gitsigns = true,
      nvimtree = true,
      treesitter = false,
      notify = false,
    },
  },
  config = function(_, opts)
    require("catppuccin").setup(opts)
    vim.cmd.colorscheme("catppuccin")
  end,
}
