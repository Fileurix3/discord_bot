return {
  "neovim/nvim-lspconfig",
  config = function()
    vim.lsp.config("ts_ls", {})
    vim.lsp.config("lua_ls", {})
    vim.lsp.config("pyright", {})
    vim.lsp.config("rust_analyzer", {})
    vim.lsp.config("bashls", {})
    vim.lsp.config("cssls", {})


    vim.lsp.enable({
      "ts_ls",
      "lua_ls",
      "bashls",
      "cssls",
      "pyright",
      "rust_analyzer",
    })
  end,
}
