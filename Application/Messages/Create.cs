using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Chats;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class Create
    {
        public class Command : IRequest<Result<MessageDto>>
        {
            public string AuthorUsername { get; set; }
            public string ChatId { get; set; }
            public string MessageText { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.MessageText).NotEmpty();
                RuleFor(x => x.ChatId).NotEmpty();
                RuleFor(x => x.AuthorUsername).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<MessageDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<MessageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var chat = await _context.Chats.Where(x => x.Id == Guid.Parse(request.ChatId)).FirstOrDefaultAsync();

                if (chat == null) return null;

                var user = await _context.Users
                    .Include(x => x.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == request.AuthorUsername);

                var message = new Message
                {
                    Author = user,
                    MessageText = request.MessageText,
                    Chat = chat
                };

                _context.Messages.Add(message);

                var success = await _context.SaveChangesAsync() > 0;
                var result = _mapper.Map<MessageDto>(message);
                if (success) return Result<MessageDto>.Success(result);

                return Result<MessageDto>.Failure("Failde to send message.");
            }
        }
    }
}