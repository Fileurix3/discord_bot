return {
  "rest-nvim/rest.nvim",
  dependencies = {
    "nvim-treesitter/nvim-treesitter",
    "nvim-neotest/nvim-nio",
    "j-hui/fidget.nvim",
  },
  keys = {
    { "<leader>rr", "<cmd>Rest run<CR>",      desc = "Run HTTP request" },
    { "<leader>rl", "<cmd>Rest run last<CR>", desc = "Run last request" },
    { "<leader>ro", "<cmd>Rest open<CR>",     desc = "Open result window" },
    { "<leader>rc", "<cmd>Rest cookies<CR>",  desc = "Open cookies" },
  },
}
