using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateLike
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.Include(a => a.Attendees).ThenInclude(u => u.User)
                    .SingleOrDefaultAsync(x => x.Id == request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var like = await _context.ActivityLikes.FirstOrDefaultAsync(x => x.User.Id == user.Id);

                if (like != null)
                {
                    _context.ActivityLikes.Remove(like);
                }
                else
                {
                    _context.ActivityLikes.Add(new ActivityLike
                    {
                        Activity = activity,
                        User = user
                    });
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendence");
            }
        }
    }
}