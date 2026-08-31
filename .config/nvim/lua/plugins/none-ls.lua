return {
  "nvimtools/none-ls.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvimtools/none-ls-extras.nvim",
  },
  config = function()
    local null_ls = require("null-ls")
    local eslint = require("none-ls.diagnostics.eslint_d")

    null_ls.setup({
      sources = {
        eslint,
        null_ls.builtins.formatting.prettierd,
        null_ls.builtins.formatting.black,
      },
    })

    vim.cmd [[
      augroup LspFormatting
        autocmd! * <buffer>
        autocmd BufWritePre * lua vim.lsp.buf.format({ async = true })
      augroup END
    ]]
  end
}
